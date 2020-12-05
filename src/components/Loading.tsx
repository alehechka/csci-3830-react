import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	spinner: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '50%',
	},
}));

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const CenteredLoading = (props: Record<string, any>) => {
	const styles = useStyles();
	return (
		<div className={styles.spinner}>
			<CircularProgress {...props} />
		</div>
	);
};

export default CenteredLoading;
