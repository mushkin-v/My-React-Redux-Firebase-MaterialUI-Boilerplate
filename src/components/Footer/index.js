import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	pos: {
		marginTop: "2%"
	}
});

const Footer = ({ classes }) => (
	<div className={classes.pos}>
		<Typography variant="caption" gutterBottom align="center">
			Powered by Mushkin Vitaliy © 2018
		</Typography>
	</div>
);

Footer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
