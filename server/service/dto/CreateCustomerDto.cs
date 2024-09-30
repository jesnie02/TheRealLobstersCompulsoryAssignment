﻿using dataAccess.Models;

namespace service.dto;

public class CreateCustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    
   
    
    public static CreateCustomerDto FromCustomer(Customer customer)
    {
        return new CreateCustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Phone = customer.Phone,
            Email = customer.Email,
       
        };
    }
}