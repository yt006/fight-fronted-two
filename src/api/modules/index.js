import { GET } from "@/api/api.js";
export function getEnergyOverview(params){
	return GET('/carbonReport/emissionChart/overall')
}
export function getEnergyPercent(params){
	return GET('/carbonReport/emissionChart/percent')
}
export function getProductionStat(params){
	return GET('/carbonReport/productPowerReport/year')
}