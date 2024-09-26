namespace service.dto;

public class TraitToPaperDto
{
    public int PaperId { get; set; }
    public List<int> TraitIds { get; set; } = new List<int>();
}