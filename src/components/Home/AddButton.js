import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5
  }
});

const AddButton = ({ classes, onClick }) => (
  <Button
    variant="fab"
    className={classes.fab}
    color="secondary"
    onClick={onClick}
  >
    <AddIcon />
  </Button>
);

AddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddButton);
