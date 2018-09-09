import React from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	modal: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute",
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: "none"
	},
	button: {
		marginTop: theme.spacing.unit * 4,
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2
	}
});

const CustomModal = ({
	open,
	classes,
	handleModalClose,
	handleModalAction,
	modalText,
	leftButtonText,
	rightButtonText
}) => (
	<Modal
		aria-labelledby="simple-modal-title"
		aria-describedby="simple-modal-description"
		open={open}
		onClose={handleModalClose}
	>
		<div className={classes.modal}>
			<Grid
				container
				direction="column"
				justify="space-evenly"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Typography variant="title" id="modal-title" align="center">
						{modalText}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="outlined"
						onClick={handleModalClose}
						className={classes.button}
					>
						{leftButtonText}
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleModalAction}
						className={classes.button}
					>
						{rightButtonText}
					</Button>
				</Grid>
			</Grid>
		</div>
	</Modal>
);

export default withStyles(styles)(CustomModal);
