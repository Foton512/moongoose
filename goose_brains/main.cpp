#include "goose_brains.h"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

#include <iostream>

#include <boost/version.hpp>
#include <functional>

using namespace std;

void WebSocketServerThread(TGooseBrains& gooseBrains) {
    using TWebSocketServer = websocketpp::server<websocketpp::config::asio>;
    TWebSocketServer server;
    server.set_message_handler(
        [&gooseBrains](websocketpp::connection_hdl hdl, TWebSocketServer::message_ptr msg) {
            rapidjson::Document document;
            document.Parse(msg->get_payload().c_str());

            //rapidjson::StringBuffer buffer;
            //rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
            //document.Accept(writer);
            //cout << buffer.GetString() << endl;

            gooseBrains.ProcessExternalCommand(document);
        }
    );
    server.init_asio();
    server.listen(9012);
    server.start_accept();

    server.run();
}

int main(int argc, char** argv) {
    TGooseBrains gooseBrains(0, "/tmp/stream/pic.jpg", 640, 480, 30000);
    std::thread webSocketServerThread(WebSocketServerThread, std::ref(gooseBrains));
    webSocketServerThread.detach();
    gooseBrains.MainLoop();

    return 0;
}
