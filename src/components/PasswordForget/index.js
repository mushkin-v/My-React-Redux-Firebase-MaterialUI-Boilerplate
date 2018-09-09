import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";
import * as routes from "../../constants/routes";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
	layout: {
		width: "auto",
		display: "block", // Fix IE11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	marginTop: {
		marginTop: theme.spacing.unit * 2
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	form: {
		width: "100%", // Fix IE11 issue.
		marginTop: theme.spacing.unit
	},
	error: {
		color: "#d50000"
	},
	success: {
		color: "#1a73e8"
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

const INITIAL_STATE = {
	email: "",
	error: null,
	thankYou: ""
};

class PasswordForgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email } = this.state;

		auth
			.doPasswordReset(email)
			.then(() => {
				this.setState(() => ({
					...INITIAL_STATE,
					thankYou: "A verification link has been sent to your email account."
				}));
			})
			.catch(error => {
				this.setState(() => ({
					thankYou: "",
					error: error
				}));
			});

		event.preventDefault();
	};

	render() {
		const { email, error, thankYou } = this.state;
		const classes = this.props.classes;
		const isInvalid = email === "";

		return (
			<React.Fragment>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant="headline">
							Enter your recovery email
						</Typography>
						<form className={classes.form} onSubmit={this.onSubmit}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Email Address</InputLabel>
								<Input
									id="email"
									name="email"
									autoComplete="email"
									autoFocus
									value={email}
									onChange={event =>
										this.setState({ email: event.target.value })
									}
								/>
							</FormControl>

							{error && (
								<Typography className={classes.error}>
									{error.message}
								</Typography>
							)}

							{thankYou && (
								<Typography className={classes.success}>{thankYou}</Typography>
							)}

							<Button
								type="submit"
								fullWidth
								variant="raised"
								color="primary"
								className={classes.submit}
								disabled={isInvalid}
							>
								Reset My Password
							</Button>
						</form>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

const PasswordForgetLink = () => (
	<Typography variant="caption">
		<Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
	</Typography>
);

PasswordForgetForm.propTypes = {
	classes: PropTypes.object.isRequired
};

const PasswordForgetFormWithStyles = withStyles(styles)(PasswordForgetForm);

export default PasswordForgetFormWithStyles;

export { PasswordForgetLink };
