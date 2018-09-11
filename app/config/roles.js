export default {
  admin: {
    can: [
      // Admin permissions
    ],
    inherits: ['user']
  },
  user: {
    can: [
      // User permissions
    ],
    inherits: ['guest']
  },
  guest: {
    can: [
      // Guest permissions
    ]
  }
}
