import socket
from scapy.all import ARP, Ether, srp


def scan_network():
    devices = {}
    # Obtener la dirección IP actual y la subred de la interfaz de red
    ip_address = ARP(pdst="192.168.1.1").psrc
    subnet = ip_address + "/24"

    # Crear un paquete ARP para buscar dispositivos en la red
    arp = ARP(pdst=subnet)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether / arp

    # Enviar el paquete ARP a la red y recibir la respuesta
    result = srp(packet, timeout=3, verbose=0)[0]

    # Mostrar las direcciones MAC y nombres de dominio de los dispositivos encontrados
    # print("Dispositivos en la red:")
    # print("IP" + " "*18 + "MAC" + " "*18 + "Nombre de dominio")
    for sent, received in result:
        mac_address = received.hwsrc
        mac_address_upper = mac_address.upper()
        ip_address = received.psrc
        try:
            hostname = socket.gethostbyaddr(ip_address)[0]
        except socket.herror:
            hostname = "No disponible"
        devices[mac_address_upper] = ip_address
        # print("{:16}    {}    {}".format(ip_address, mac_address, hostname))

    return devices
