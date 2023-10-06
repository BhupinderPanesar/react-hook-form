using Microsoft.AspNetCore.Mvc;

namespace UserForm.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("all")]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
        return Ok(_userService.GetUsers());
    }
    
    [HttpGet("{userId}")]
    public ActionResult<User> GetUser(string userId)
    {
        var user = _userService.GetUser(userId);

        if (user is null)
        {
            return BadRequest();
        }
        
        return Ok(user);
    }

    [HttpPut]
    public ActionResult<User> UpdateUser(User user)
    {
        var updatedUser = _userService.UpdateUser(user);

        if (updatedUser is null)
        {
            return NotFound();
        }

        return Ok(updatedUser);
    }

    [HttpPatch("{userId}/updateEmail")]
    public ActionResult<User> UpdateEmail(string userId, UpdateEmailModel emailModel)
    {
        var user = _userService.UpdateUserEmail(userId, emailModel.Email);

        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }
    
    [HttpPost]
    public ActionResult<User> CreateUser(CreateUserDto createUserDto)
    {
        var newUser = _userService.CreateUser(createUserDto.Username, createUserDto.Email);

        if (newUser is null)
        {
            return BadRequest();
        }

        return Created("", newUser);
    }
    
    [HttpDelete("{userId}")]
    public ActionResult DeleteUser(string userId)
    {
        var deletedUser = _userService.DeleteUser(userId);

        if (!deletedUser)
        {
            NotFound();
        }
        
        return Ok();
    }
}