#ifndef SERVER_HTTP_SERVER_H_
#define SERVER_HTTP_SERVER_H_

#include <memory>
#include "httplib.h"
#include "middleware/middleware.h"
#include "routers/auth_router.h"
#include "routers/admin_router.h"
namespace server
{
    class HttpServer
    {
    public:
        HttpServer();

        // 启动服务器
        void Start(int port);

        // 停止服务器
        void Stop();

    private:
        // 初始化路由
        void InitializeRoutes();

        std::shared_ptr<httplib::Server> server_;
        std::unique_ptr<router::AuthRouter> auth_router_;
        std::unique_ptr<router::AdminRouter> admin_router_;
        std::vector<std::unique_ptr<middleware::Middleware>> middlewares_;
        void HandleRequest(const httplib::Request &req, httplib::Response &res);

        void UseMiddleware(std::unique_ptr<middleware::Middleware> middleware);
    };

} // namespace server

#endif // SERVER_HTTP_SERVER_H_