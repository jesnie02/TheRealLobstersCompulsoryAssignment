using _service.dto;
using _service.Validators;
using dataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using PgCtx;
using Xunit.Abstractions;


namespace ValidatorTest;

public class ValidatorTest : WebApplicationFactory<Program>
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly PgCtxSetup<MyDbContext> _ctxSetup = new() ;
    
    private readonly CreatePaperValidator _validator;

        public ValidatorTest(ITestOutputHelper outputHelper)
        {
            Environment.SetEnvironmentVariable("DB", _ctxSetup._postgres.GetConnectionString());
            _outputHelper = outputHelper;
            _validator = new CreatePaperValidator();
        }

        [Fact]
        public async Task CreatePaper_ShouldThrowValidationException_WhenInvalid()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "fd", // Invalid name (less than 3 characters)
                Discontinued = false,
                Price = 100,
                Stock = 10
            };

            var validator = new CreatePaperValidator();
            var validationResult = validator.Validate(createPaperDto);

            // Act 
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                if (!validationResult.IsValid)
                {
                    throw new FluentValidation.ValidationException(validationResult.Errors);
                }

                return Task.CompletedTask;
            });
    
            // Assert
            Assert.Contains("Name must be at least 3 characters long", exception.Message);
            _outputHelper.WriteLine(exception.Message);
        }
        
        [Fact]
        public async Task CreatePaper_ShouldNotThrowValidationException_WhenValid()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "Valid Name",
                Discontinued = false,
                Price = 100,
                Stock = 10
            };

            var validator = new CreatePaperValidator();
            var validationResult = validator.Validate(createPaperDto);

            // Act & Assert
            Assert.True(validationResult.IsValid, "Expected validation to pass for a valid CreatePaperDto.");
            _outputHelper.WriteLine("Validation passed for a valid CreatePaperDto.");
        }
        
        
        [Fact]
        public async Task CreatePaper_ShouldThrowValidationException_WhenPriceIsZeroOrNegative()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "Valid Name",
                Discontinued = false,
                Price = 0, // Invalid price (zero)
                Stock = 10
            };

            var validator = new CreatePaperValidator();
            var validationResult = validator.Validate(createPaperDto);

            // Act
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                if (!validationResult.IsValid)
                {
                    throw new FluentValidation.ValidationException(validationResult.Errors);
                }

                return Task.CompletedTask;
            });

            // Assert
            Assert.Contains("Price must be greater than 0", exception.Message);
            _outputHelper.WriteLine(exception.Message);
        }
        
        
        [Fact]
        public async Task CreatePaper_ShouldThrowValidationException_WhenStockIsNegative()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "Valid Name",
                Discontinued = false,
                Price = 100,
                Stock = -8 // Invalid stock (negative)
            };

            var validator = new CreatePaperValidator();
            var validationResult = validator.Validate(createPaperDto);

            // Act 
            
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                if (!validationResult.IsValid)
                {
                    throw new FluentValidation.ValidationException(validationResult.Errors);
                }

                return Task.CompletedTask;
            }); 
            
            //Assert
            
            Assert.Contains("Stock must be greater than 0", exception.Message);
            _outputHelper.WriteLine(exception.Message);
        }
        
      
        
        
}