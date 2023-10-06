import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, Modal } from "semantic-ui-react";
import { FormSchemaType, formSchema } from "./form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { User } from "./UserModel";
import { toast } from "react-toastify";


interface Props {
    id?: string;
    username?: string;
    email?: string;
}

export const CreateUpdateUser = ({ id = "", username = "", email = "" }: Props) => {
    const [open, setOpen] = useState(false);
    const query = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['users', id],
        mutationFn: (data: FormSchemaType) => {

            if (id) {
                const user: User = {
                    userId: id,
                    username: data.username,
                    email: data.email
                }
                return api.put(user);
            }
            return api.post(data);
        },
        onSuccess: () => {
            toast.success(`${id ? "Updated" : "Created"} user successfully`);
            query.invalidateQueries(['users']);
            cleanForm();
        },
        onError: () => {
            toast.error(`Failed to ${id ? "Update" : "Create"} user`);
        }
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        mutation.mutate(data);
    };

    const cleanForm = () => {
        reset();
        setOpen(false);
    };

    const handleCancel = () => {
        cleanForm();
    }

    return (
        <>
            <Button
                content={`${id ? "Update" : "Create"} user`}
                onClick={() => setOpen(prev => !prev)}
            />
            <Modal open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                <Modal.Header>{id ? "Update" : "Create"} user</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Field>
                            <label>Username</label>
                            <input
                                placeholder='Username'
                                id="username"
                                defaultValue={username}
                                {...register("username")}
                            />
                            {
                                errors.username && <span className="text-red-800 block mt-2">{errors.username.message}</span>
                            }
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder='Email'
                                id="email"
                                defaultValue={email}
                                {...register("email")}
                            />
                            {
                                errors.email && <span className="text-red-800 block mt-2">{errors.email.message}</span>
                            }
                        </Form.Field>
                        <Button type='submit' disabled={isSubmitting}>Submit</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </>
    )
}