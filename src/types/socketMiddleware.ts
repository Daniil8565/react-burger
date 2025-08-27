export interface TSocketActions {
  wsConnect: string; // экшен для инициализации соединения
  wsDisconnect: string; // экшен для закрытия соединения
  onOpen: string; // экшен при открытии соединения
  onClose: string; // экшен при закрытии соединения
  onError: string; // экшен при ошибке
  onMessage: string; // экшен при получении сообщения
  wsSend?: string; // экшен для отправки сообщения (опционально)
}
