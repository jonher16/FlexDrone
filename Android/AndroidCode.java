private void startSocket(){
    SocketHandler handler = SocketHandler.INSTANCE;
    handler.setSocket();
    handler.establishConnection();
    Socket mSocket = handler.getSocket();
    mSocket.on("gimbalcommand" , args -> {
        String command = args[0].toString();
        switch(command){
            case "GET_GIMBAL_STATE":
                boolean gimbalState = false;
                try {
                    //gimbalState = widgetModel.isGimbalControlEnabled();
                } catch(Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                String gimbalStateString = "Gimbal state: " + gimbalState;
                mSocket.emit("uxmsg", gimbalStateString);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //addLog(gimbalStateString);
                    }
                });
            case "UNLOCK":

                try {
                    fpvInteractionWidget = Utils.findRequiredViewAsType(findViewById(android.R.id.content), R.id.widget_fpv_interaction, "field 'fpvInteractionWidget'", FPVInteractionWidget.class);
                    fpvInteractionWidget.setGimbalControlEnabled(true);
                } catch(Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "LOCK":
                try {
                    fpvInteractionWidget.setGimbalControlEnabled(false);
                } catch(Exception e){
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "UP":
                try {

                    fpvInteractionWidget.rotateGimbal(0,0,0,20);
                } catch(Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "DOWN":
                try {
                    fpvInteractionWidget.rotateGimbal(0, 0, 0, -20);
                } catch (Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "RIGHT":
                try {
                    fpvInteractionWidget.rotateGimbal(0, 0, 20, 0);
                } catch (Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "LEFT":
                try {
                    fpvInteractionWidget.rotateGimbal(0, 0, -20, 0);
                } catch(Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
            case "STOP":
                try {
                    fpvInteractionWidget.stopGimbalRotation();
                } catch(Exception e) {
                    mSocket.emit("uxmsg", "Error in app: "+e);
                }
                break;
        };
        mSocket.emit("uxmsg", "Received command in app: "+args[0].toString());
        String command_log = "Command received from server: " + command;
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //addLog(command_log);
            }
        });
    });
    mSocket.on("uxconnection" , args -> {

        //boolean gimbalUp = fpvInteractionWidget.isGimbalControlEnabled();
        //mSocket.emit("uxmsg", "Gimbal status: " + gimbalUp);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //addLog("Connection with FlexDrone server established");
                Toast toast = Toast.makeText(getApplicationContext(), "Connection with FlexDrone established", Toast.LENGTH_LONG);
                toast.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
                toast.show();
            }
        });

    });
    mSocket.emit("uxconnection", "Connection with DJI UX app established.");

    //addLog("Starting connection with FlexDrone server");

}
