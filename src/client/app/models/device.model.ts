namespace devices {
  'use strict';

  export interface IDevice {
    _id: string,
    ip: string,
    name: string,
    description: string,
    mac: string,
    dhcp: boolean,
    os: string,
    type: string
  }
}
