export default [] as Event[];

interface Event {
  type: 'login' | 'logout' | 'role-set' | 'start';
  value: string;
}
