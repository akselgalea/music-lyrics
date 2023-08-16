const API_URL = 'https://api.deezer.com'

export class MusicController {
  static async getAll (req, res) {
    try {
      const response = await fetch(API_URL + '/chart/0')
      const json = await response.json()
      if (json.error) { throw new Error(json.error.message) }

      return res.json(json)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
