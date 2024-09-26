using dataAccess.interfaces;

namespace dataAccess.Models;

public class PaperRepository(MyDbContext context) : IPaper
{
    public Paper InsertPaper(Paper paper)
    {
        context.Papers.Add(paper);
        context.SaveChanges();
        return paper;
    }
}