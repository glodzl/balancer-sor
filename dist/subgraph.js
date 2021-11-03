"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const SUBGRAPH_URL = process.env.SUBGRAPH_URL ||
    'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan-v2';
// Returns all public pools
function fetchSubgraphPools(SubgraphUrl = '') {
    return __awaiter(this, void 0, void 0, function* () {
        // can filter for publicSwap too??
        const query = `
      {
        pools: pools(first: 1000, where: {id_not_in: ["0xae1c69eae0f1342425ea3fdb51e9f11223c7ad5b00010000000000000000000b", "0x5018fa8aa910fa2eea07529d80e7a44b2e2d29cf000100000000000000000022", "0xe2fd25b84aa76486e0cbc2c2ca383c3587abb942000100000000000000000028"]}) {
          id
          address
          poolType
          swapFee
          totalShares
          tokens {
            address
            balance
            decimals
            weight
            priceRate
          }
          tokensList
          totalWeight
          amp
          expiryTime
          unitSeconds
          principalToken
          baseToken
          swapEnabled
        }
      }
    `;
        const response = yield isomorphic_fetch_1.default(SubgraphUrl === '' ? SUBGRAPH_URL : SubgraphUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });
        const { data } = yield response.json();
        return { pools: data.pools };
    });
}
exports.fetchSubgraphPools = fetchSubgraphPools;
