import socket

port = 8000  # Puerto que utiliza el dispositivo para recibir conexiones
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

def connection(ip_address):
    # Establece una conexión TCP con el dispositivo utilizando su dirección IP y un puerto específico
    s.connect((ip_address, port))

    # Envía datos al dispositivo a través de la conexión
    message = 'Hola, dispositivo!'
    s.sendall(message.encode())

    # Espera una respuesta del dispositivo y la imprime en la consola
    response = s.recv(1024).decode()
    print('Respuesta del dispositivo:', response)

# Cierra la conexión
s.close()