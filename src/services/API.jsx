import axios from "axios";

export const handleDelete = async (id, setListArsenal) => {
  try {
    await axios.delete(`https://backend-industriaswayne.onrender.com/deleteArsenal/${id}`);
    setListArsenal((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Erro ao deletar item:", error);
  }
};

export const fetchArsenal = async (setListArsenal) => {
  try {
    const { data } = await axios.get("https://backend-industriaswayne.onrender.com/getarsenal");
    setListArsenal(data);
  } catch (error) {
    console.error("Erro ao carregar arsenal:", error);
    setListArsenal([]);
  }
};

export const fetchUser = async (setUser) => {
  try {
    const { data } = await axios.get("https://backend-industriaswayne.onrender.com/getusers");
    setUser(data);
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    setUser([]);
  }
};

export const handleEdit = async () => {
  try {
    const { data } = await axios.patch("https://backend-industriaswayne.onrender.com/patchArsenal");
    setListArsenal(data);
  } catch (error) {
    console.error("Erro ao carregar arsenal :", error);
    setListArsenal([]);
  }
}