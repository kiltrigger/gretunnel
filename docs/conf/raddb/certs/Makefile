######################################################################
#
#	Make file to be installed in /etc/raddb/certs to enable
#	the easy creation of certificates.
#
#	See the README file in this directory for more information.
#	
#	$Id$
#
######################################################################

DH_KEY_SIZE	= 1024

#
#  Set the passwords
#
PASSWORD_SERVER	= `grep output_password server.cnf | sed 's/.*=//;s/^ *//'`
PASSWORD_CA	= `grep output_password ca.cnf | sed 's/.*=//;s/^ *//'`
PASSWORD_CLIENT	= `grep output_password client.cnf | sed 's/.*=//;s/^ *//'`

USER_NAME	= `grep emailAddress client.cnf | grep '@' | sed 's/.*=//;s/^ *//'`
CA_DEFAULT_DAYS = `grep default_days ca.cnf | sed 's/.*=//;s/^ *//'`

######################################################################
#
#  Make the necessary files, but not client certificates.
#
######################################################################
.PHONY: all
all: dh random server ca

.PHONY: client
client: client.pem

.PHONY: ca
ca: ca.der

.PHONY: server
server: server.pem

######################################################################
#
#  Diffie-Hellman parameters
#
######################################################################
dh:
	/usr/bin/openssl dhparam -out dh $(DH_KEY_SIZE)

######################################################################
#
#  Create a new self-signed CA certificate
#
######################################################################
ca.key ca.pem: ca.cnf
	/usr/bin/openssl req -new -x509 -keyout ca.key -out ca.pem \
		-days $(CA_DEFAULT_DAYS) -config ./ca.cnf
		

ca.der: ca.pem
	/usr/bin/openssl x509 -inform PEM -outform DER -in ca.pem -out ca.der

######################################################################
#
#  Create a new server certificate, signed by the above CA.
#
######################################################################
server.csr server.key: server.cnf
	/usr/bin/openssl req -new  -out server.csr -keyout server.key -config ./server.cnf

server.crt: server.csr ca.key ca.pem index.txt serial
	/usr/bin/openssl ca -batch -keyfile ca.key -cert ca.pem -in server.csr  -key $(PASSWORD_CA) -out server.crt -extensions xpserver_ext -extfile xpextensions -config ./server.cnf

server.p12: server.crt
	/usr/bin/openssl pkcs12 -export -in server.crt -inkey server.key -out server.p12  -passin pass:$(PASSWORD_SERVER) -passout pass:$(PASSWORD_SERVER)

server.pem: server.p12
	/usr/bin/openssl pkcs12 -in server.p12 -out server.pem -passin pass:$(PASSWORD_SERVER) -passout pass:$(PASSWORD_SERVER)

.PHONY: server.vrfy
server.vrfy: ca.pem
	/usr/bin/openssl verify -CAfile ca.pem server.pem

######################################################################
#
#  Create a new client certificate, signed by the the above server
#  certificate.
#
######################################################################
client.csr client.key: client.cnf
	/usr/bin/openssl req -new  -out client.csr -keyout client.key -config ./client.cnf

client.crt: client.csr server.crt server.key index.txt serial
	/usr/bin/openssl ca -batch -keyfile server.key -cert server.crt -in client.csr  -key $(PASSWORD_SERVER) -out client.crt -extensions xpclient_ext -extfile xpextensions -config ./client.cnf

client.p12: client.crt
	/usr/bin/openssl pkcs12 -export -in client.crt -inkey client.key -out client.p12  -passin pass:$(PASSWORD_CLIENT) -passout pass:$(PASSWORD_CLIENT)

client.pem: client.p12
	/usr/bin/openssl pkcs12 -in client.p12 -out client.pem -passin pass:$(PASSWORD_CLIENT) -passout pass:$(PASSWORD_CLIENT)
	cp client.pem $(USER_NAME).pem

.PHONY: server.vrfy
client.vrfy: server.pem client.pem 
	c_rehash .
	/usr/bin/openssl verify -CApath . client.pem

######################################################################
#
#  Miscellaneous rules.
#
######################################################################
index.txt:
	@touch index.txt

serial:
	@echo '01' > serial

random:
	@if [ -e /dev/urandom ] ; then \
		dd if=/dev/urandom of=./random count=10 >/dev/null 2>&1; \
	else \
		date > ./random; \
	fi

print:
	/usr/bin/openssl x509 -text -in server.crt

printca:
	/usr/bin/openssl x509 -text -in ca.pem

clean:
	@rm -f *~ *old client.csr client.key client.crt client.p12 client.pem

#
#	Make a target that people won't run too often.
#
destroycerts:
	rm -f *~ dh *.csr *.crt *.p12 *.der *.pem *.key index.txt* \
			serial* random *\.0 *\.1
