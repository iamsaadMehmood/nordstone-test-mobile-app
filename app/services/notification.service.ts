import PushNotification from 'react-native-push-notification';
class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminder',
        channelName: 'tap on send Notification',
        channelDescription: 'hy, You have tap on send notification',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  sendNotification() {
    PushNotification.localNotification({
      channelId: 'reminder',
      title: '🔔 Notification',
      message: 'Hy, You have tap on send notification',
      // date: date,
    });
  }
}

export default new Notifications();
