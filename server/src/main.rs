use axum::routing::get;
use socketioxide::{
    extract::{Data, SocketRef, State},
    SocketIo,
};
use std::env;
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;
use tracing::info;
use tracing_subscriber::FmtSubscriber;

#[derive(Debug, serde::Deserialize)]
struct MessageIn {
    topic: String,
    message: String,
    sender: String,
}
#[derive(Debug, serde::Serialize)]
struct Message {
    message: String,
    sender: String,
    date: chrono::DateTime<chrono::Utc>,
}

async fn on_connect(socket: SocketRef) {
    info!("socket connected: {}", socket.id);

    socket.on(
        "join",
        |socket: SocketRef, Data::<String>(room)| async move {
            info!("Received join: {:?}", room);
            let _ = socket.leave_all();
            let _ = socket.join(room.clone());
        },
    );

    socket.on(
        "message",
        |socket: SocketRef, Data::<MessageIn>(data)| async move {
            info!("Received message: {:?}", data);

            let response = Message {
                message: data.message,
                sender: data.sender,
                date: chrono::Utc::now(),
            };

            let _ = socket.within(data.topic).emit("message", response);
        },
    )
}

async fn handler(axum::extract::State(io): axum::extract::State<SocketIo>) {
    info!("handler called");
    let _ = io.emit("hello", "world");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing::subscriber::set_global_default(FmtSubscriber::default())?;

    let (layer, io) = SocketIo::builder().build_layer();

    io.ns("/", on_connect);

    let app = axum::Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/hello", get(handler))
        .with_state(io)
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::permissive())
                .layer(layer),
        );
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());

    // Construct the address string
    let addr = format!("0.0.0.0:{}", port);
    info!("Starting server");

    axum::Server::bind(&addr.parse().unwrap())
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
