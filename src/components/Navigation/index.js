import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as routes from "../../constants/routes";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";

import ModalSignOut from "../Modal";

import { auth } from "../../firebase";

import { compose } from "recompose";

const styles = theme => ({
	fab: {
		position: "fixed",
		top: theme.spacing.unit * 5,
		right: theme.spacing.unit * 5
	}
});

const NavigationAuth = ({ anchorEl, handleMenuItemClick }) => (
	<Menu
		id="simple-menu"
		anchorEl={anchorEl}
		open={Boolean(anchorEl)}
		onClose={() => handleMenuItemClick}
		TransitionComponent={Fade}
	>
		<MenuItem onClick={() => handleMenuItemClick(routes.LANDING)}>
			Landing
		</MenuItem>
		<MenuItem onClick={() => handleMenuItemClick(routes.HOME)}>Home</MenuItem>
		<MenuItem onClick={() => handleMenuItemClick(routes.ACCOUNT)}>
			Account
		</MenuItem>
		<MenuItem onClick={() => handleMenuItemClick(routes.SIGN_OUT)}>
			Sign Out
		</MenuItem>
	</Menu>
);

const NavigationNonAuth = ({ anchorEl, handleMenuItemClick }) => (
	<Menu
		id="simple-menu"
		anchorEl={anchorEl}
		open={Boolean(anchorEl)}
		onClose={() => handleMenuItemClick}
		TransitionComponent={Fade}
	>
		<MenuItem onClick={() => handleMenuItemClick(routes.LANDING)}>
			Landing
		</MenuItem>
		<MenuItem onClick={() => handleMenuItemClick(routes.SIGN_IN)}>
			Sign In
		</MenuItem>
		<MenuItem onClick={() => handleMenuItemClick(routes.SIGN_UP)}>
			Sign Up
		</MenuItem>
	</Menu>
);

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			modalOpen: false
		};
	}

	handleMenuButtonClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuItemClick = (route = null) => {
		this.setState({ anchorEl: null });

		switch (route) {
			case routes.SIGN_OUT:
				this.setState({ modalOpen: true });
				break;
			default:
				this.props.history.push(route);
		}
	};

	handleModalClose = () => {
		this.setState({ modalOpen: false });
	};

	handleModalAction = () => {
		this.handleModalClose();
		auth.doSignOut();
	};

	render() {
		const { anchorEl, modalOpen } = this.state;
		const classes = this.props.classes;

		return (
			<div>
				<ClickAwayListener onClickAway={this.handleMenuItemClick}>
					<Button
						aria-owns={anchorEl ? "simple-menu" : null}
						aria-haspopup="true"
						onClick={this.handleMenuButtonClick}
						variant="fab"
						className={classes.fab}
						color="primary"
					>
						<MenuIcon />
					</Button>
				</ClickAwayListener>
				{this.props.authUser ? (
					<NavigationAuth
						anchorEl={anchorEl}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				) : (
					<NavigationNonAuth
						anchorEl={anchorEl}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				)}
				<ModalSignOut
					open={modalOpen}
					handleModalClose={this.handleModalClose}
					handleModalAction={this.handleModalAction}
					modalText="Are you sure you want to Sign Out?"
					leftButtonText="Cancel"
					rightButtonText="Sign Out"
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authUser: state.sessionState.authUser
});

Navigation.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(
	withRouter,
	withStyles(styles),
	connect(mapStateToProps)
)(Navigation);
