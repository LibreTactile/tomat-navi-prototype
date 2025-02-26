#configuration variables
delayOff= 00.001
DELAY_ON=0.001
pulseTimer=0
PULSE_DURATION=0.12
keepAliveTimer=0
KEEP_ALIVE_PERIOD=10
pulse=False


# IO SECTION written by Juan Nino - Sept 2022
# TOMAT NAVI V0.5.1
# ----------START OF USB SERIAL SECTION----------------------
# USB SERIAL SECTION Copied from raspberry pi forums: https://forums.raspberrypi.com/viewtopic.php?t=302889 July 2022
# USB serial communication for the Raspberry Pi Pico (RD2040) using the second RD2040
# thread/processor (written by Dorian Wiskow - Janaury 2021)

from sys import stdin, exit
from _thread import start_new_thread
from utime import sleep
from machine import Pin




# 
# global variables to share between both threads/processors
# 
bufferSize = 1024                 # size of circular buffer to allocate
buffer = [' '] * bufferSize       # circuolar incomming USB serial data buffer (pre fill)
bufferEcho = False                 # USB serial port echo incooming characters (True/False) 
bufferNextIn, bufferNextOut = 0,0 # pointers to next in/out character in circualr buffer
terminateThread = False           # tell 'bufferSTDIN' function to terminate (True/False)


#
# Interface pinout definitions:
# Buttons
bStar = Pin(16, Pin.IN, Pin.PULL_UP)
bPlus = Pin(17, Pin.IN, Pin.PULL_UP)
bMin = Pin(18, Pin.IN, Pin.PULL_UP)
bUp = Pin(19, Pin.IN, Pin.PULL_UP)
bDown = Pin(20, Pin.IN, Pin.PULL_UP)
bNext = Pin(21, Pin.IN, Pin.PULL_UP)

b1 = Pin(22, Pin.IN, Pin.PULL_UP)
b2 = Pin(26, Pin.IN, Pin.PULL_UP)
b3 = Pin(27, Pin.IN, Pin.PULL_UP)
b4= Pin(28, Pin.IN, Pin.PULL_UP)
# Motors
m0 = Pin(0,Pin.OUT)
m1 = Pin(4,Pin.OUT)
m2 = Pin(8,Pin.OUT)
m3 = Pin(12,Pin.OUT)
m4 = Pin(1,Pin.OUT)
m5 = Pin(5,Pin.OUT)
m6 = Pin(9,Pin.OUT)
m7 = Pin(13,Pin.OUT)
m8 = Pin(2,Pin.OUT)
m9 = Pin(6,Pin.OUT)
mA = Pin(10,Pin.OUT)
mB = Pin(15,Pin.OUT)
mC = Pin(3,Pin.OUT)
mD = Pin(7,Pin.OUT)
mE = Pin(11,Pin.OUT)
mF = Pin(10,Pin.OUT)

#led1 = Pin(25, Pin.OUT) #led

#arrays
motors= [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, mA, mB, mC, mD, mE, mF]
mBuffer= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
interfaceButtons= [1,1,1,1,1,1,1,1,1,1]
pulsatingMotor= -1


#
# bufferSTDIN() function to execute in parallel on second Pico RD2040 thread/processor
#
def bufferSTDIN():
    global buffer, bufferSize, bufferEcho, bufferNextIn, terminateThread
    
    while True:                                 # endless loop
        if terminateThread:                     # if requested by main thread ...
            break                               #    ... exit loop
        buffer[bufferNextIn] = stdin.read(1)    # wait for/store next byte from USB serial
        if bufferEcho:                          # if echo is True ...
            print(buffer[bufferNextIn], end='') #    ... output byte to USB serial
        bufferNextIn += 1                       # bump pointer
        if bufferNextIn == bufferSize:          # ... and wrap, if necessary
            bufferNextIn = 0


#
# function to check if a byte is available in the buffer and if so, return it
#
def getByteBuffer():
    global buffer, bufferSize, bufferNextOut, bufferNextIn
    
    if bufferNextOut == bufferNextIn:           # if no unclaimed byte in buffer ...
        return ''                               #    ... return a null string
    n = bufferNextOut                           # save current pointer
    bufferNextOut += 1                          # bump pointer
    if bufferNextOut == bufferSize:             #    ... wrap, if necessary
        bufferNextOut = 0
    return (buffer[n])                          # return byte from buffer

#
# function to check if a line is available in the buffer and if so return it
# otherwise return a null string
#
# NOTE 1: a line is one or more bytes with the last byte being LF (\x0a)
#      2: a line containing only a single LF byte will also return a null string
#
def getLineBuffer():
    global buffer, bufferSize, bufferNextOut, bufferNextIn

    if bufferNextOut == bufferNextIn:           # if no unclaimed byte in buffer ...
        return ''                               #    ... RETURN a null string

    n = bufferNextOut                           # search for a LF in unclaimed bytes
    while n != bufferNextIn:
        if buffer[n] == '\x0a':                 # if a LF found ... 
            break                               #    ... exit loop ('n' pointing to LF)
        n += 1                                  # bump pointer
        if n == bufferSize:                     #    ... wrap, if necessary
            n = 0
    if (n == bufferNextIn):                     # if no LF found ...
            return ''                           #    ... RETURN a null string

    line = ''                                   # LF found in unclaimed bytes at pointer 'n'
    n += 1                                      # bump pointer past LF
    if n == bufferSize:                         #    ... wrap, if necessary
        n = 0

    while bufferNextOut != n:                   # BUILD line to RETURN until LF pointer 'n' hit
        
        if buffer[bufferNextOut] == '\x0d':     # if byte is CR
            bufferNextOut += 1                  #    bump pointer
            if bufferNextOut == bufferSize:     #    ... wrap, if necessary
                bufferNextOut = 0
            continue                            #    ignore (strip) any CR (\x0d) bytes
        
        if buffer[bufferNextOut] == '\x0a':     # if current byte is LF ...
            bufferNextOut += 1                  #    bump pointer
            if bufferNextOut == bufferSize:     #    ... wrap, if necessary
                bufferNextOut = 0
            break                               #    and exit loop, ignoring (i.e. strip) LF byte
        line = line + buffer[bufferNextOut]     # add byte to line
        bufferNextOut += 1                      # bump pointer
        if bufferNextOut == bufferSize:         #    wrap, if necessary
            bufferNextOut = 0
    return line                                 # RETURN unclaimed line of input

#
# main program begins here ...
#
# set 'inputOption' to either  one byte ‘BYTE’  OR one line ‘LINE’ at a time. Remember, ‘bufferEcho’
# determines if the background buffering function ‘bufferSTDIN’ should automatically echo each
# byte it receives from the USB serial port or not (useful when operating in line mode when the
# host computer is running a serial terminal program)
#
# start this MicroPython code running (exit Thonny with code still running) and then start a
# serial terminal program (e.g. putty, minicom or screen) on the host computer and connect
# to the Raspberry Pi Pico ...
#
#    ... start typing text and hit return.
#
#    NOTE: use Ctrl-C, Ctrl-C, Ctrl-D then Ctrl-B on in the host computer terminal program 
#           to terminate the MicroPython code running on the Pico 
#

# -------------------------- END OF USB SERIAL SECTION-----------------------------------

def clear_all():
    m0.value(0)
    m1.value(0)
    m2.value(0)
    m3.value(0)
    m4.value(0)
    m5.value(0)
    m6.value(0)
    m7.value(0)
    m8.value(0)
    m9.value(0)
    mA.value(0)
    mB.value(0)
    mC.value(0)
    mD.value(0)
    mE.value(0)
    mF.value(0)
    

def set_window(line):
    global pulsatingMotor
    global mBuffer
    
   
    #line = '1,2,3,4P*'
    #get only info before termination character
    tline= line.split('*')[0]
    
    motorValues= tline.split(',') #get one value per display line
    #motorValues= [1,2,3,4P]

    #make sure string values are ok
    for val in motorValues:
        if(len(val)>0):
            if(val[0]<"0" or val[0]>"4"):
                return
        else:
            return



    mBuffer=  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
    clear_all()
    
    l = 0
    pulsating=False
    pulsatingMotor=-1
    for val in motorValues: #for each line rx
        #val = 1 // 2P // 3 // 4
        
        #first line
        if (l==0):
            
            if(len(val)>1):         # if there is a char after the column number, then pulsating
                pulsating=True      # this will be a pulsating motor
            if(val[0]=="1"):        # did we receive this motor number?
                mBuffer[0]=1         # turn on the first motor on this row
                if(pulsating):      # are you searching for a pulsating motor?
                    pulsatingMotor= 0  # set this to be a pulsasting motor
                    pulsating=False # disable search for pulsating motor
            elif (val[0]=="2"):
                 mBuffer[1]=1
                 if(pulsating):
                    pulsatingMotor= 1
                    pulsating=False
            elif (val[0]=="3"):
                 mBuffer[2]=1
                 if(pulsating):
                    pulsatingMotor= 2
                    pulsating=False
            elif (val[0]=="4"):
                 mBuffer[3]=1 
                 if(pulsating):
                    pulsatingMotor= 3
                    pulsating=False
        # second line
        if (l==1):
            if(len(val)>1):
                pulsating=True
            if(val[0]=="1"):
                mBuffer[4]=1
                if(pulsating):
                    pulsatingMotor= 4
                    pulsating=False
            elif (val[0]=="2"):
                 mBuffer[5]=1
                 if(pulsating):
                    pulsatingMotor= 5
                    pulsating=False
            elif (val[0]=="3"):
                 mBuffer[6]=1
                 if(pulsating):
                    pulsatingMotor= 6
                    pulsating=False
            elif (val[0]=="4"):
                 mBuffer[7]=1
                 if(pulsating):
                    pulsatingMotor= 7  
                    pulsating=False  
        # third line
        if (l==2):
            if(len(val)>1):
                pulsating=True
            if(val[0]=="1"):
                mBuffer[8]=1
                if(pulsating):
                    pulsatingMotor= 8
                    pulsating=False
            elif (val[0]=="2"):
                 mBuffer[9]=1
                 if(pulsating):
                    pulsatingMotor= 9
                    pulsating=False
            elif (val[0]=="3"):
                 mBuffer[10]=1
                 if(pulsating):
                    pulsatingMotor= 10
                    pulsating=False
            elif (val[0]=="4"):
                 mBuffer[11]=1
                 if(pulsating):
                    pulsatingMotor= 11  
                    pulsating=False
        # FOURTH line
        if (l==3):
            if(len(val)>1):
                pulsating=True
            if(val[0]=="1"):
                mBuffer[12]=1
                if(pulsating):
                    pulsatingMotor= 12
                    pulsating=False
            elif (val[0]=="2"):
                 mBuffer[13]=1
                 if(pulsating):
                    pulsatingMotor= 13
                    pulsating=False
            elif (val[0]=="3"):
                 mBuffer[14]=1
                 if(pulsating):
                    pulsatingMotor= 14
                    pulsating=False
            elif (val[0]=="4"):
                 mBuffer[15]=1
                 if(pulsating):
                    pulsatingMotor= 15  
                    pulsating=False    
        l+=1



def set_intensity(line):
    global delayOff
    #line = 'i#'; 0<= # >= 9
    
    
    #change delay off if receive intensity level
    if(line[1]>='0' and line[1]<='3'):
        
            if line[1]== '0':
                delayOff = 0.05
            if line[1]== '1':
                delayOff = 0.004
            if line[1]== '2':
                delayOff = 0.001
            if line[1]== '3':
                delayOff = 0
           
           


    
def motor_cycle():
    global mBuffer
    global motors
    global delayOff
    global DELAY_ON
    global PULSE_DURATION
    global pulseTimer
    global pulsatingMotor
    global pulse

    if(pulseTimer>= PULSE_DURATION): #if we reached the pulse duration reset pulsation
        #toggle motor state
        
            if(pulse):
                pulse=False
            else:
                pulse = True
            pulseTimer=0
            
    #activate motors
    i=0
    for m in motors:
        m.value(mBuffer[i])#copy buffer value to motor pin
        i+=1

    #sleep
    sleep(DELAY_ON)
    if(pulsatingMotor>=0): #if there is a motor to pulsate
         if pulse==False:
             motors[pulsatingMotor].off()

    sleep(DELAY_ON)
    #deactivate motors
    clear_all()
    if(pulsatingMotor>=0): #if there is a motor to pulsate
         if pulse:
             motors[pulsatingMotor].on()
               
            

    #sleep
    sleep(delayOff)

    pulseTimer+= DELAY_ON+DELAY_ON+ delayOff

    


def check_buttons():
    """
    Button report event. "Bxs*"  x= button name (1,2,3,4,U,D,M,P,F), s= status (U= released or D= pressed ) 
    """
    buttonValues = [b1.value(),b2.value(),b3.value(),b4.value(),bUp.value(), bDown.value(),bMin.value(), bPlus.value(), bStar.value(), bNext.value()]
    buttonNames= ["1","2","3","4","U","D","M","P","F","N"]

   # flank detection for every button
    for i in range(10):
        if buttonValues[i] != interfaceButtons[i]:      #if value is not the same as buffer
            interfaceButtons[i] = buttonValues[i]       #change the state of buffer
            if buttonValues[i]:                         #button released = true
                    print("B"+buttonNames[i]+"U*")      #print button release report
            else:                                       #button pressed = false
                    print("B"+buttonNames[i]+"D*")      #print button press report
    
    

clear_all()

#
# instantiate second 'background' thread on RD2040 dual processor to monitor and buffer
# incomming data from 'stdin' over USB serial port using ‘bufferSTDIN‘ function (above)
#
bufferSTDINthread = start_new_thread(bufferSTDIN, ())


try:
    while True:
        buffLine = getLineBuffer()                      # get a line if it is available?
        if buffLine:                                    # if there is...
            #print ("<<"+buffLine + ">>")    
            if(buffLine[0]=="b"):                       # keep alive response           
               # led1.toggle()                           # toogle led
               #sleep(1)
               pass

            elif (buffLine[0]=="i"):                    # intensity value          
                set_intensity(buffLine)                 # parse intensity
            elif (buffLine[0]>="0" and buffLine[0]<="4"):                
                set_window(buffLine)               # refresh display
        
        motor_cycle()                                   # motor loop
        check_buttons()                                 # Poll button status
        keepAliveTimer+= delayOff+DELAY_ON              #keep a timer for sending keep alive signal
        if(keepAliveTimer>= KEEP_ALIVE_PERIOD):
            print("a*")                                     # keep alive signal
            keepAliveTimer=0
        
except KeyboardInterrupt:                               # trap Ctrl-C input
    clear_all()
    terminateThread = True                              # signal second 'background' thread to terminate 
    exit()