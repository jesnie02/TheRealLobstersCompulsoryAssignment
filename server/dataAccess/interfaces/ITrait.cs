using dataAccess.Models;

namespace dataAccess.interfaces;

public interface ITrait
{
    Trait InsertTrait(Trait trait);
    Trait UpdateTrait(Trait trait);
    bool DeleteTrait(int id);
}