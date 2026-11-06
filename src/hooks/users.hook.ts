import { useCallback, useState } from "react";
import { UserService } from "../services/user.service";
import { Users } from "../types/entities/user.entity";


export const useUsers = () =>{

    const [user, setUser] = useState<Users | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadUser = useCallback( async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const user = await UserService.findById(1);
            setUser(user);
        } catch (error) {
            setError('Erreur lors de la chargement de l\'utilisateur !');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,

        loadUser
    };
}