import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function authorizeUser(post) {
  return window.contract.authorizeUser({ post });
}

export function getPayments() {
  return window.contract.getPayments();
}

export function buyPost(post, author, amount) {
  return window.contract.buyPost(
    { post, author },
    GAS,
    parseNearAmount(amount + "")
  );
}
