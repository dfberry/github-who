import { useEffect } from 'react';

// @ts-ignore
export const useEffectAsync = (effect:any, inputs:any) => { useEffect(() => { effect();}, inputs);}