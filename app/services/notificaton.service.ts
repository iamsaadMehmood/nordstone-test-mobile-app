import PushNotification from 'react-native-push-notification';
class Notifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminder', // (required)
        channelName: 'tap on send Notification', // (required)
        channelDescription: 'hy, You have tap on send notification',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  sendNotification(date: Date) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminder',
      title: '🔔 Notification',
      message: 'Hy, You have tap on send notification',
      date: date,
    });
  }
}

export default new Notifications();
