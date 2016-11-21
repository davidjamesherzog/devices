interface IDeviceDetailsController {
  device: devices.IDevice;
  find: (id: string) => void,
  $routerOnActivate: (next: any, previous: any) => void
}
