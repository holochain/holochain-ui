FROM holochain/holochain-rust:latest

RUN git clone https://github.com/holochain/holochain-rust && cd holochain-rust && git checkout 93620518d549a6fe99cc49f9bed36d99b909925d

WORKDIR /holochain/holochain-rust
ENV PATH /root/.cargo/bin:$PATH

RUN make install_cmd

RUN rustup install nightly
RUN rustup default nightly
RUN rustup target add wasm32-unknown-unknown --toolchain nightly
RUN cd container && cargo install --force --path .
