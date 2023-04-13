


export const getEnvironments = () => {


    if (typeof process !== "undefined") {
      process.env
      return { ...process.env}
    } else {
      import.meta.env
      return { ...import.meta.env}
    }
  }
