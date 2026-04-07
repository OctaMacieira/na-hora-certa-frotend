import axios from 'axios'

// URL base da API backend (configurável via variável de ambiente)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Criar instância do axios com configuração base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Composable para gerenciar operações de salas
export const useRoomService = () => {
  
  // Obter todas as salas
  const getAllRooms = async () => {
    try {
      const response = await api.get('/rooms')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar salas:', error)
      throw error
    }
  }

  // Obter sala por ID
  const getRoomById = async (id) => {
    try {
      const response = await api.get(`/rooms/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar sala:', error)
      throw error
    }
  }

  // Cadastrar nova sala
  const createRoom = async (roomData) => {
    try {
      const response = await api.post('/rooms', roomData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar sala:', error)
      throw error
    }
  }

  // Atualizar sala existente
  const updateRoom = async (id, roomData) => {
    try {
      const response = await api.put(`/rooms/${id}`, roomData)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar sala:', error)
      throw error
    }
  }

  // Deletar sala
  const deleteRoom = async (id) => {
    try {
      const response = await api.delete(`/rooms/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao deletar sala:', error)
      throw error
    }
  }

  // Buscar endereço pelo CEP (via ViaCEP)
  const getAddressByZipCode = async (zipCode) => {
    try {
      const cleanZipCode = zipCode.replace(/\D/g, '')
      const response = await axios.get(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      throw error
    }
  }

  return {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getAddressByZipCode
  }
}
