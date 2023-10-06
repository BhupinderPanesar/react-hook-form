namespace UserForm.Api;

public class UserService
{
    private static readonly List<User> Users = new();
    public IList<User> GetUsers()
    {
        return Users;
    }

    public User? GetUser(string id)
    {
        return Users.FirstOrDefault(u => u.UserId == id);
    }

    public User? CreateUser(string username, string email)
    {
        var userExists = Users.FirstOrDefault(u => u.Email == email);

        if (userExists is not null)
        {
            return null;
        }
        
        var user = new User
        {
            UserId = Guid.NewGuid().ToString(),
            Username = username,
            Email = email,
        };
        
        Users.Add(user);
        return user;
    }

    public User? UpdateUser(User user)
    {
        var userFound = Users.FirstOrDefault(u => u.UserId == user.UserId);

        if (userFound is null)
        {
            return null;
        }
        
        userFound.Email = user.Email;
        userFound.Username = user.Username;
        Users.RemoveAll(u => u.UserId == user.UserId);
        Users.Add(userFound);
        return user;
    }
    
    public User? UpdateUserEmail(string id, string email)
    {
        var userFound = Users.FirstOrDefault(u => u.UserId == id);

        if (userFound is null)
        {
            return null;
        }
        
        userFound.Email = email;
        Users.RemoveAll(u => u.UserId == id);
        Users.Add(userFound);
        return userFound;
    }
    
    public bool DeleteUser(string userId)
    {
        var user = Users.FirstOrDefault(u => u.UserId == userId);
        
        if (user is null)
        {
            return false;
        }
        
        Users.RemoveAll(u => u.UserId == userId);

        return true;
    }
}