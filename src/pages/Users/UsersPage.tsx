import React from 'react';
import { useUsers } from '../../hooks';
import MaterialTable, { Column } from 'material-table';
import { User } from '../../models';
import { Avatar } from '@material-ui/core';

export const UsersPage = () => {
	const [users, loading] = useUsers();

	const columns: Column<User>[] = [
		{
			field: 'image',
			render: (data) => <Avatar src={data.image} alt={`${data.firstName} ${data.lastName}`} />,
		},
		{
			field: 'firstName',
			title: 'First',
			defaultSort: 'asc',
		},
		{
			field: 'lastName',
			title: 'Last',
		},
		{
			field: 'title',
			title: 'Title',
		},
		{
			field: 'major',
			title: 'Major',
		},
		{ field: 'color', title: 'Color' },
		{ field: 'number', title: 'Number' },
	];

	return (
		<MaterialTable
			title='Users'
			data={users}
			isLoading={loading}
			columns={columns}
			options={{ filtering: false, pageSize: 10 }}
		/>
	);
};

export default UsersPage;
