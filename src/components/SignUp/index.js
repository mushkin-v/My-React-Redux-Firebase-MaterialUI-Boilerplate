import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import { PasswordForgetLink } from "../PasswordForget";

import { auth, db } from "../../firebase";
import * as routes from "../../constants/routes";

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
	username: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	error: null
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { username, email, passwordOne } = this.state;

		const { history } = this.props;

		auth
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				// Create a user in your own accessible Firebase Database too
				db.doCreateUser(authUser.user.uid, username, email)
					.then(() => {
						this.setState(() => ({ ...INITIAL_STATE }));
						history.push(routes.HOME);
					})
					.catch(error => {
						this.setState(updateByPropertyName("error", error));
					});
			})
			.catch(error => {
				this.setState(updateByPropertyName("error", error));
			});

		event.preventDefault();
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;
		const classes = this.props.classes;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			username === "" ||
			email === "";

		return (
			<React.Fragment>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant="headline">Create your Account</Typography>
						<form className={classes.form} onSubmit={this.onSubmit}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="username">Full Name</InputLabel>
								<Input
									id="username"
									name="username"
									autoComplete="username"
									autoFocus
									value={username}
									onChange={event =>
										this.setState(
											updateByPropertyName("username", event.target.value)
										)
									}
								/>
							</FormControl>

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
								<InputLabel htmlFor="passwordOne">Password</InputLabel>
								<Input
									name="passwordOne"
									type="password"
									id="passwordOne"
									autoComplete="current-password"
									value={passwordOne}
									onChange={event =>
										this.setState(
											updateByPropertyName("passwordOne", event.target.value)
										)
									}
								/>
							</FormControl>

							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
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
								Sign Up
							</Button>
							<Grid
								container
								direction="column"
								justify="space-evenly"
								alignItems="center"
								className={classes.marginTop}
							>
								<PasswordForgetLink />
							</Grid>
						</form>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

const SignUpLink = () => (
	<Typography variant="caption">
		Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
	</Typography>
);

SignUpForm.propTypes = {
	classes: PropTypes.object.isRequired
};

const SignUpFormWithStyles = withStyles(styles)(SignUpForm);

export default withRouter(SignUpFormWithStyles);

export { SignUpLink };
