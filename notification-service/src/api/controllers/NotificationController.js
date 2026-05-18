class NotificationController {
  health(req, res) {
    res.status(200).json({
      status: 'ok',
      service: 'notification-service',
      timestamp: new Date().toISOString(),
    });
  }
}

export default new NotificationController();