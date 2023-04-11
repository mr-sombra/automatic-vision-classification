import serial.tools.list_ports

def get_serial_ports():
    #print('Buscando dispositivos COM...')
    ports = serial.tools.list_ports.comports()
    port_list = [port.device for port in ports]
    if port_list:
        #print('Se encontraron los siguientes dispositivos:')
        #print(port_list)
        return port_list
    else:
        #print('No se encontraron dispositivos COM.')
        pass
