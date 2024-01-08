//! The [address lookup table program][np].
//!
//! [np]: https://docs.solana.com/developing/runtime-facilities/programs#address-lookup-table-program

#[cfg(not(feature = "no-entrypoint"))]
mod entrypoint;
pub mod error;
pub mod processor;

solana_program::declare_id!("AddressLookupTab1e1111111111111111111111111");

// Export current sdk types for downstream users building with a different sdk
// version
pub use solana_program::address_lookup_table::{instruction, state};
