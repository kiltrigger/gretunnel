# $< - список зависимостей
# $@ - имя текущей цели

CC=gcc
CCFLAGS=-L/usr/local/lib/mysql -Wall -DDEBUG
BINDIR=bin
RCDDIR=rc.d
INSTBIN=/usr/local/bin
INSTSBIN=/usr/local/sbin
CNFINSTDIR=/usr/local/etc

ONCDEPS=${BINDIR}/config.o ${BINDIR}/vpnms_functions.o ${BINDIR}/onconnect.o
ONDDEPS=${BINDIR}/config.o ${BINDIR}/vpnms_functions.o ${BINDIR}/ondisconnect.o
HSTDEPS=${BINDIR}/config.o ${BINDIR}/vpnms_functions.o ${BINDIR}/hourlystat.o
MRSDEPS=${BINDIR}/config.o ${BINDIR}/vpnms_functions.o ${BINDIR}/monthlyreset.o
ALLDEPS=monthlyreset.o hourlystat.o vpnmsd.o vpnmsd_nf_thread.o config.o vpnms_functions.o onconnect.o ondisconnect.o onconnect ondisconnect hourlystat monthlyreset
VPDDEPS=${BINDIR}/config.o ${BINDIR}/vpnms_functions.o ${BINDIR}/vpnmsd_nf_thread.o ${BINDIR}/vpnmsd.o

vpnmsd: ${ALLDEPS} 
	${CC} ${CCFLAGS} -o ${BINDIR}/$@ ${VPDDEPS} -lmysqlclient -lz -lpthread

monthlyreset: ${MRSDEPS}
	${CC} ${CCFLAGS} -o ${BINDIR}/$@ ${MRSDEPS} -lmysqlclient -lz

hourlystat: ${HSTDEPS}
	${CC} ${CCFLAGS} -o ${BINDIR}/$@ ${HSTDEPS} -lmysqlclient -lz

ondisconnect: ${ONDDEPS}
	${CC} ${CCFLAGS} -o ${BINDIR}/$@ ${ONDDEPS} -lmysqlclient -lz

onconnect: ${ONCDEPS}
	${CC} ${CCFLAGS} -o ${BINDIR}/$@ ${ONCDEPS} -lmysqlclient -lz

vpnmsd.o: vpnmsd.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

vpnmsd_nf_thread.o: vpnmsd_nf_thread.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

config.o: config.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

vpnms_functions.o: vpnms_functions.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

onconnect.o: onconnect.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

ondisconnect.o: ondisconnect.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

monthlyreset.o: monthlyreset.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

hourlystat.o: hourlystat.c
	${CC} ${CCFLAGS} -c $< -o ${BINDIR}/$@

remake: clean vpnmsd

clean:
	rm -f ${BINDIR}/*.o
	rm -f ${BINDIR}/vpnmsd
	rm -f ${BINDIR}/monthlyreset
	rm -f ${BINDIR}/hourlystat
	rm -f ${BINDIR}/ondisconnect
	rm -f ${BINDIR}/onconnect
	
install:
	cp ${BINDIR}/hourlystat ${INSTBIN}/hourlystat
	cp ${BINDIR}/onconnect ${INSTSBIN}/onconnect
	cp ${BINDIR}/ondisconnect ${INSTSBIN}/ondisconnect
	cp ${BINDIR}/monthlyreset ${INSTSBIN}/monthlyreset
	cp ${BINDIR}/vpnmsd ${INSTSBIN}/vpnmsd
	cp onconnect.sh ${INSTSBIN}/onconnect.sh
	cp ondisconnect.sh ${INSTSBIN}/ondisconnect.sh
	cp config.cfg ${CNFINSTDIR}/vpnms.conf
	cp ${RCDDIR}/vpnmsd /usr/local/etc/rc.d/vpnmsd
	chmod 755 ${INSTBIN}/hourlystat
	chmod 744 ${INSTSBIN}/onconnect
	chmod 744 ${INSTSBIN}/ondisconnect
	chmod 744 ${INSTSBIN}/monthlyreset
	chmod 744 ${INSTSBIN}/vpnmsd
	chmod 744 ${INSTSBIN}/onconnect.sh
	chmod 744 ${INSTSBIN}/ondisconnect.sh
	chmod 744 /usr/local/etc/rc.d/vpnmsd

