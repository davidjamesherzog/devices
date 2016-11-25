interface IDeviceListController {
  devices: Array<any>;
  list: () => void,
  create: (device: devices.IDevice) => void,
  purge: (device: devices.IDevice) => void
}
