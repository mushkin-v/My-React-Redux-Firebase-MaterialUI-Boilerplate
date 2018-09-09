import React, { Component } from "react";

import { auth } from "../../firebase";

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
	passwordOne: "",
	passwordTwo: "",
	error: null
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { passwordOne } = this.state;

		auth
			.doPasswordUpdate(passwordOne)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
			})
			.catch(error => {
				this.setState(updateByPropertyName("error", error));
			});

		event.preventDefault();
	};

	render() {
		const { passwordOne, passwordTwo, error } = this.state;
		const { classes, email } = this.props;
		const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

		return (
			<React.Fragment>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant="title">{email}</Typography>
						<Typography variant="subheading" className={classes.marginTop}>
							Reset Password
						</Typography>
						<form className={classes.form} onSubmit={this.onSubmit}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="passwordOne">New Password</InputLabel>
								<Input
									id="passwordOne"
									type="password"
									name="passwordOne"
									autoComplete="current-password"
									autoFocus
									value={passwordOne}
									onChange={event =>
										this.setState(
											updateByPropertyName("passwordOne", event.target.value)
										)
									}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="passwordTwo">
									Confirm New Password
								</InputLabel>
								<Input
									name="passwordTwo"
									type="password"
									id="passwordTwo"
									autoComplete="current-password"
									value={passwordTwo}
									onChange={event =>
										this.setState(
											updateByPropertyName("passwordTwo", event.target.value)
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
								Reset My Password
							</Button>
							<Grid
								container
								direction="column"
								justify="space-evenly"
								alignItems="center"
								className={classes.marginTop}
							/>
						</form>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

PasswordChangeForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PasswordChangeForm);
