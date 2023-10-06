import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { Button, Card, Input } from "semantic-ui-react";
import { User } from "./UserModel";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";


export const UserPage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState<string>("");
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient()
  const { data, isError } = useQuery<User, AxiosResponse>(['users', id], async () => {
    const res = await api.get(id!);
    return res.data;
  });
  const user: User = data || {} as User;

  const mutation = useMutation({
    mutationKey: ['users', id],
    mutationFn: (email: string) => {
      return api.updateEmail(id!, email);
    },
    onMutate(email) {
      const previousUser = queryClient.getQueryData(['users', id]);
      queryClient.setQueryData(['users', id], (oldUser: User | undefined) => oldUser !== undefined ? ({ ...oldUser, email: email }) : oldUser);
      const updatedUser = queryClient.getQueryData(['users', id]);
      return { previousUser, updatedUser }
    },
    onSuccess() {
      toast.success("Updated email successfully");
    },
    onError() {
      toast.error("Failed to update email");
    },
    onSettled() {
      setEditMode(false);
      queryClient.invalidateQueries(['users']);
    }
  });

  if (isError) {
    toast.error("Failed to fetch user");
    navigate("/");
  }

  const handleEditEmail = () => {
    setEditMode(true);
  }

  const handleEmailSave = () => {
    mutation.mutate(currentEmail);
  }

  return (
    <>
      <Button onClick={() => navigate("/")} content="Go back to Users" />
      <Card>
        <Card.Content>
          <Card.Header>{user.username}</Card.Header>
          <Card.Description>
            Email:  {!editMode && <>{user.email} <Button content="Edit Email" onClick={handleEditEmail} /></>}
            {editMode && <><Input defaultValue={user.email} onChange={(event) => setCurrentEmail(event.target.value)} placeholder="Email" /> <Button content="Save" onClick={handleEmailSave} /></>}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  )
}