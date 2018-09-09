import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
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
import Grid from "@material-ui/core/Grid";

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
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	email: "",
	password: "",
	error: null
};

class SignInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email, password } = this.state;

		const { history } = this.props;

		auth
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
			})
			.catch(error => {
				this.setState(updateByPropertyName("error", error));
			});

		event.preventDefault();
	};

	render() {
		const { email, password, error } = this.state;
		const classes = this.props.classes;
		const isInvalid = password === "" || email === "";

		return (
			<React.Fragment>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant="headline">Sign in</Typography>
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
										this.setState(
											updateByPropertyName("email", event.target.value)
										)
									}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Password</InputLabel>
								<Input
									name="password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={password}
									onChange={event =>
										this.setState(
											updateByPropertyName("password", event.target.value)
										)
									}
								/>
							</FormControl>

							{error && (
								<Typography className={classes.error}>
									{error.message}
								</Typography>
							)}

							<Button
								type="submit"
								fullWidth
								variant="raised"
								color="primary"
								className={classes.submit}
								disabled={isInvalid}
							>
								Sign in
							</Button>
							<Grid
								container
								direction="column"
								justify="space-evenly"
								alignItems="center"
								className={classes.marginTop}
							>
								<SignUpLink />
								<PasswordForgetLink />
							</Grid>
						</form>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

SignInForm.propTypes = {
	classes: PropTypes.object.isRequired
};

const SignInFormWithStyles = withStyles(styles)(SignInForm);

export default withRouter(SignInFormWithStyles);
