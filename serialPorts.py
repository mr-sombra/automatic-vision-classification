import serial.tools.list_ports


def get_serial_ports():
    ports = serial.tools.list_ports.comports()
    port_list = [port.device for port in ports]
    if port_list:
        return port_list
    else:
        pass
