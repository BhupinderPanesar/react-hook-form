import { Grid } from "semantic-ui-react"
import { User } from "./UserModel"
import { CreateUpdateUser } from "./CreateUpdateUser"
import { Button } from "semantic-ui-react";
import { api } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Props {
    users: User[]
}

export const Users = ({ users }: Props) => {
    console.log("Users");
    console.log(users)
    const query = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: string) => {
            return api.delete(id);
        },
        onSuccess() {
            toast.success("User deleted");
            query.invalidateQueries(["users"]);
        },
    });

    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    if (users.length === 0) return <p>No users</p>

    return (
        <Grid columns={4} divided>
            {
                users.map((user) => (
                    <Grid.Row divided key={user.userId}>
                        <Grid.Column>
                            <Button as={Link} to={`${user.userId}`} content={user.username} />
                        </Grid.Column>
                        <Grid.Column>
                            {user.email}
                        </Grid.Column>
                        <Grid.Column>
                            <CreateUpdateUser id={user.userId} email={user.email} username={user.username} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button content="Delete User" onClick={() => handleDelete(user.userId)} />
                        </Grid.Column>
                    </Grid.Row>
                ))
            }
        </Grid>
    )
}