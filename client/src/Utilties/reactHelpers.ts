import { useEffect } from 'react';

// @ts-nocheck
export const useEffectAsync = (effect:any, inputs:any) => { useEffect(() => { effect();}, inputs);}