﻿using Microsoft.EntityFrameworkCore;

namespace dataAccess;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
        
    }

}
