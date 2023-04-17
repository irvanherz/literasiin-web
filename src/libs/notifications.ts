const TRANSLATORS = {
  'stories.writers.invitations.created|notify-invitee': (notif: any) => {
    return {
      title: 'You are invited',
      description: 'Someone has invited you to contribute',
      url: '/stories/mine'
    }
  },
  'stories.writers.invitations.acepted|notify-inviter': (notif: any) => {
    return {
      title: 'Your invitation has accepted',
      description: 'Someone has accepted your invitation to contribute',
      url: '/stories/mine'
    }
  },
  'stories.writers.invitations.rejected|notify-inviter': (notif: any) => {
    return {
      title: 'Your invitation has rejected',
      description: 'Someone has rejected your invitation to contribute',
      url: '/stories/mine'
    }
  },
  default: (notif: any) => {
    return {
      title: '<unknown>',
      description: '<unknown>',
      url: '#'
    }
  }
}

export function translateNotification (notif: any) {
  const key = `${notif.type}|${notif.subtype}` as keyof typeof TRANSLATORS
  const translator = TRANSLATORS[key] || TRANSLATORS.default
  return translator(notif)
}
